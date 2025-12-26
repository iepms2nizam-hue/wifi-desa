export default {
  async fetch(request) {
    const url = new URL(request.url);
    const channel = url.searchParams.get("channel");
    if (!channel) return new Response("Missing ?channel=", { status: 400 });

    const kv = {
      awani: {
        mpd: "https://linearjitp-playback.astro.com.my/dash-wv/linear/5025/default_ott.mpd",
        kid: "6f06f3b3cf7cbad0cc8b21e2c94dfb10",
        key: "525510cfa634bd630af8c95fa93576ca"
      }
    }[channel];

    if (!kv) return new Response("Channel not found", { status: 404 });

    const res = await fetch(kv.mpd, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Linux; Android 15)",
        "Referer": "https://astrogo.astro.com.my/",
        "Origin": "https://astrogo.astro.com.my",
        "Accept": "*/*",
        "Accept-Encoding": "identity"
      }
    });

    return new Response(res.body, res);
  }
}
