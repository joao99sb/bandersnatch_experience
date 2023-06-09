"use client";
import React, { useRef, useEffect, useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { AiOutlineArrowLeft } from "react-icons/ai";

import { ModalButton } from "../components/ModalButton";

import MANIFEST_URL from "./manifest.json";
import { Network, VideoMediaPlayer } from "../lib";
const localhost = ["127.0.0.1", "localhost"];

export default async function Streaming() {
  const [options1, setOptions1] = useState("a");
  const [options2, setOptions2] = useState("d");
  const [options, setOptions] = useState(["q", "s"]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const modal = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const isLocal = !!~localhost.indexOf(window.location.hostname);

  const host = isLocal ? MANIFEST_URL.localHost : MANIFEST_URL.productionHost;

  const network = new Network(host);
  const videoMediaPlayer = new VideoMediaPlayer({
    manifestJSON: MANIFEST_URL,
    network: network,
  });

  useEffect(() => {
    videoMediaPlayer.initializeCodec(videoRef, modal);

    videoRef.current?.addEventListener("play", closeModal);
    videoRef.current?.addEventListener("pause", openModal);
  }, []);

  useEffect(() => {
    console.log(videoMediaPlayer.options);
    setOptions1(videoMediaPlayer.options[0]);
    setOptions2(videoMediaPlayer.options[1]);
  }, [videoMediaPlayer.options]);

  const closeModal = () => {
    if (modal.current) {
      modal.current.style.display = "none";
    }
  };
  const openModal = () => {
    if (modal.current) {
      modal.current.style.display = "flex";
    }
  };

  return (
    <div
      className="
        h-screen
        w-screen
      bg-black
      "
    >
      <nav
        className="
          fixed
          w-full
          p-4
          z-10
          flex
          flex-row
          items-center
          gap-8
          bg-black
          bg-opacity-70
        "
      >
        <AiOutlineArrowLeft
          className="text-white cursor-pointer"
          size={40}
          onClick={() => router.back()}
        />
        <p className=" text-white text-1xl md:text-3xl font-bold ">
          <span className=" font-light ">Whatching: </span>
        </p>
      </nav>
      <video ref={videoRef} autoPlay controls className="h-full w-full"></video>
      <div
        ref={modal}
        className={`
        fixed
        flex
        bottom-1/4   
        w-full
        h-auto
        justify-center
        items-center
        gap-[30vw] 
        `}
      >
        <ModalButton option={options[0]} />
        <ModalButton option={options[1]} />
      </div>
    </div>
  );
}
