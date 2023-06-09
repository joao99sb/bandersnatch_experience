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
    console.log(url);
    return url
      .replace(fileResolutionTag, fileResolution)
      .replace(hostTag, this.host);
  }

  public async fetchFile(url: string) {
    const response = await fetch(url)
    return response.arrayBuffer()
  }
}
