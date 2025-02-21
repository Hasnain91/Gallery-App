function LoadingSpinner({ size = "50px", color = "bg-blue-500" }) {
  return (
    <div className="flex items-center justify-center h-screen">
      <div
        className="animate-spin rounded-full border-t-4 border-solid"
        style={{
          width: size,
          height: size,
          borderColor: `${color} transparent transparent transparent`,
        }}
      ></div>
    </div>
  );
}

export default LoadingSpinner;
