import React from "react";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import { Network } from "./network";
import { ModalButton } from "../components/ModalButton";
import { buttonFunction } from "./func";

type objectJSONType = Record<string, any>;
type videoReactElement = React.RefObject<HTMLVideoElement>;
type divReactElement = React.RefObject<HTMLDivElement>;

interface VideoMediaPlayerInterface {
  manifestJSON: objectJSONType;
  network: Network;
}

export class VideoMediaPlayer {
  manifestJSON: objectJSONType;
  network: Network;
  videoElement: videoReactElement;
  sourceBuffer: SourceBuffer;
  selectedPart: any;
  videoDuration: number;
  modal: divReactElement;
  activeItem: any;
  setIntervalId: NodeJS.Timer | null;

  options: string[];
  constructor({ manifestJSON, network }: VideoMediaPlayerInterface) {
    this.manifestJSON = manifestJSON;
    this.network = network;
    this.videoElement = {} as videoReactElement;
    this.videoDuration = 0;
    this.sourceBuffer = {} as SourceBuffer;
    this.selectedPart = {};
    this.modal = {} as divReactElement;
    this.options = [];
    this.activeItem = {};
    this.setIntervalId = null;
  }

  public initializeCodec(videoRef: videoReactElement, modal: divReactElement) {
    this.videoElement = videoRef;
    this.modal = modal;
    const isMediaSourceSupported = !!window.MediaSource;
    const isCodedSupported = window.MediaSource.isTypeSupported(
      this.manifestJSON.codec as string
    );

    if (!isMediaSourceSupported || !isCodedSupported) {
      alert("Your browser does not support");
      return;
    }

    if (videoRef.current) {
      const mediaSource = new MediaSource();

      const url = URL.createObjectURL(mediaSource);
      videoRef.current.src = url;
      mediaSource.addEventListener("sourceopen", async () =>
        this.handleSourceOpen(mediaSource)
      );
    }
  }

  public clearInterval() {
    if (this.setIntervalId) {
      clearInterval(this.setIntervalId);
      this.setIntervalId = null;
    }
  }

  public currentFileResolution() {
    const lowest_resolution = "144";
    const preparedURL = {
      url: this.manifestJSON.finalizar.url,
      fileResolution: lowest_resolution,
      fileResolutionTag: this.manifestJSON.fileResolutionTag,
      hostTag: this.manifestJSON.hostTag,
    };

    const url = this.network.parseManifestURL(preparedURL);
    return this.network.getProperResolution(url);
  }

  private async handleSourceOpen(mediaSource: MediaSource) {
    this.sourceBuffer = mediaSource.addSourceBuffer(this.manifestJSON.codec);
    this.selectedPart = this.manifestJSON.intro;
    this.activeItem = this.selectedPart;
    const selectedPart = this.selectedPart;
    mediaSource.duration = this.videoDuration;
    await this.fileDownload(selectedPart.url);

    this.setIntervalId = setInterval(this.waitForQuestions.bind(this), 200);
  }

  private async fileDownload(url: string) {
    const fileResolution = await this.currentFileResolution();
    console.log({ fileResolution });
    const preparedURL = {
      url,
      fileResolution: fileResolution as string,
      fileResolutionTag: this.manifestJSON.fileResolutionTag,
      hostTag: this.manifestJSON.hostTag,
    };

    const finalUrl = this.network.parseManifestURL(preparedURL);
    this.setVideoPlayerDuration(finalUrl);

    const data = await this.network.fetchFile(finalUrl);
    return this.processBufferSegment(data);
  }

  private setVideoPlayerDuration(finalUrl: string) {
    const bars = finalUrl.split("/");
    const [name, videoDuration] = bars[bars.length - 1].split("-");
    this.videoDuration += Number(videoDuration);
  }
  public async nextChunck(data: string) {
    const key = data.toLowerCase();
    const selected = this.manifestJSON[key];

    this.selectedPart = {
      ...selected,

      // Adjust the timing when the modal will appear, based on current time
      at: parseInt(this.videoElement.current?.currentTime + selected.at),
    };

    this.videoElement.current?.play();
    await this.fileDownload(selected.url);
  }
  public waitForQuestions() {
    const currentTime = this.videoElement.current
      ?.currentTime as unknown as string;

    const currentTimeInt = parseInt(currentTime);

    const option = this.selectedPart.at === currentTimeInt;
    if (!option) return;
    if (this.activeItem.url === this.selectedPart.ulr) return;

    this.configureModal(this.selectedPart.options);
    this.activeItem = this.selectedPart;
  }

  private configureModal(options: string[]) {
    this.videoElement.current?.pause();
    if (this.modal.current) {
      this.modal.current.style.display = "flex";
    }
    const buttons = buttonFunction(options, this.nextChunck.bind(this));
    if (this.modal.current) {
      ReactDOM.render(buttons, this.modal.current);
    }
  }

  private async processBufferSegment(allSegments: BufferSource) {
    const sourceBuffer = this.sourceBuffer;
    sourceBuffer.appendBuffer(allSegments);

    return new Promise((resolve, reject) => {
      const updateEnd = (_: any) => {
        sourceBuffer.removeEventListener("updateend", updateEnd);
        sourceBuffer.timestampOffset = this.videoDuration;

        return resolve(true);
      };

      sourceBuffer.addEventListener("updateend", updateEnd);
      sourceBuffer.addEventListener("error", reject);
    });
  }


}
