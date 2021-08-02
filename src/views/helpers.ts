// Get parsed JSON object from JSON file at path
export function getJSON(path: string) {
    const Httpreq = new XMLHttpRequest();
    Httpreq.open("GET", path, false);
    Httpreq.send(null);
    return JSON.parse(Httpreq.responseText);
}