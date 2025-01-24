export default function (endpointUrl: string, results: any): any {
  const structure: any = {
    object: endpointUrl.split("/").pop(),
    url: endpointUrl,
    results,
  };

  return structure;
}
