interface ParseManifestURLParams {
  url: string;
  fileResolution: string;
  fileResolutionTag: string;
  hostTag: string;
}

export class Network {
  host: any;
  constructor(host: string) {
    this.host = host;
  }

  public parseManifestURL({
    fileResolution,
    fileResolutionTag,
    hostTag,
    url,
  }: ParseManifestURLParams) {
    return url
      .replace(fileResolutionTag, fileResolution)
      .replace(hostTag, this.host);
  }
  public parseBillBoardManifestURL({
    hostTag,
    url,
  }: {
    url: string;
    hostTag: string;
  }) {
    return url.replace(hostTag, this.host);
  }

  public async fetchFile(url: string) {
    const response = await fetch(url);
    return response.arrayBuffer();
  }

  public async getProperResolution(url: string) {
    const startMs = Date.now();
    const response = await fetch(url);
    await response.arrayBuffer();
    const endMs = Date.now();

    const durationMs = endMs - startMs;

    const resolution = [
      { start: 3001, end: 20000, resolution: 144 },
      { start: 901, end: 3000, resolution: 360 },
      { start: 0, end: 900, resolution: 720 },
    ];

    const item = resolution.find(
      (item) => item.start <= durationMs && item.end >= durationMs
    );

    const lowest_resolution = "144";
    if (!item) return lowest_resolution;
    return item.resolution;
  }
}
