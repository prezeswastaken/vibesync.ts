import JSConfetti from "js-confetti";

export default defineNuxtPlugin((nuxtApp) => {
	const jsConfetti = new JSConfetti();
	console.log("CREATING CONFETTI");

	return {
		provide: {
			jsConfetti,
		},
	};
});
