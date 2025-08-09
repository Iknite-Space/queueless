// helper function to convert microseconds to readable time
export const formatTime = (microseconds) => {
    const ms = microseconds / 1000;
    const date = new Date(ms);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };