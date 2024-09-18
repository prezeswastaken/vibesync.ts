export const useEcho = () => {
	const echo = useNuxtApp().$echo;
	return echo;
};
