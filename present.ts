{
	const presence = new Presence({
			clientId: "611012705306017792",
		}),
		strings = presence.getStrings({
			play: "presence.playback.playing",
			pause: "presence.playback.paused",
		});

	presence.on("UpdateData", async () => {
		if (
			location.pathname.startsWith("/animestore/sc_d_pc") &&
			document.querySelector("#video")
		) {
			const video: HTMLVideoElement = document.querySelector("#video"),
				isPlaying = !video.paused,
				presenceData: PresenceData = {
					details: `${document.querySelector(".backInfoTxt1").textContent} - ${
						document.querySelector(".backInfoTxt2").textContent
					}`,
					state: document.querySelector(".backInfoTxt3").textContent,
					largeImageKey: "danime",
					smallImageKey: isPlaying ? "play" : "pause",
					smallImageText: isPlaying
						? (await strings).play
						: (await strings).pause,
					startTimestamp:
						Math.floor(Date.now() / 1000) - Math.floor(video.currentTime),
				};

			if (!isPlaying) delete presenceData.startTimestamp;

			presence.setActivity(presenceData);
		}
	});
}
