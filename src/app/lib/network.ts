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
}
