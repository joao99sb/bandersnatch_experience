"use client";
import React, { useRef, useEffect, useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { AiOutlineArrowLeft } from "react-icons/ai";

import MANIFEST_URL from "./manifest.json";
import { Network, VideoMediaPlayer } from "../lib";
const localhost = ["127.0.0.1", "localhost"];

export default async function Streaming() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const modal = useRef<HTMLDivElement>(null);
  const router = useRouter();

  if (typeof window !== "undefined") {
    const isLocal = !!~localhost.indexOf(window.location.hostname);

    const host = isLocal ? MANIFEST_URL.localHost : MANIFEST_URL.productionHost;

    const network = new Network(host);

    let videoMediaPlayer = new VideoMediaPlayer({
      manifestJSON: MANIFEST_URL,
      network,
    });

    useEffect(() => {
      videoMediaPlayer.initializeCodec(videoRef, modal);

      videoRef.current?.addEventListener("play", closeModal);

      return () => {
        videoMediaPlayer.clearInterval();
        videoRef.current?.removeEventListener("play", closeModal);
      };
    }, []);

    const closeModal = useCallback(() => {
      if (modal.current) {
        modal.current.style.display = "none";
      }
    }, []);

    const getBackRouter = useCallback(() => {
      router.back();
    }, [videoMediaPlayer]);

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
            onClick={getBackRouter}
          />
          <p className=" text-white text-1xl md:text-3xl font-bold ">
            <span className=" font-light ">
              Whatching: Bandersnatch Experience
            </span>
          </p>
        </nav>
        <video ref={videoRef} autoPlay className="h-full w-full"></video>
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
        ></div>
      </div>
    );
  }
  return null
}
