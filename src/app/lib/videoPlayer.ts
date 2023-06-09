import React, { ReactElement } from "react";
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

  private async handleSourceOpen(mediaSource: MediaSource) {
    this.sourceBuffer = mediaSource.addSourceBuffer(this.manifestJSON.codec);
    this.selectedPart = this.manifestJSON.intro;
    const selectedPart = this.selectedPart;
    mediaSource.duration = this.videoDuration;
    await this.fileDownload(selectedPart.url);

    this.waitForQuestions();
  }

  private async fileDownload(url: string) {
    const preparedURL = {
      url,
      fileResolution: "360",
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

  public waitForQuestions() {
    this.configureModal(this.selectedPart.options);
  }

  private configureModal(options: string[]) {
    const buttons = buttonFunction(options);
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
