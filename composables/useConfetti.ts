export const useConfetti = () => {
	const confetti = useNuxtApp().$jsConfetti;
	return confetti;
};
