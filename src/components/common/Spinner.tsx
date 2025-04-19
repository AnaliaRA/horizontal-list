/**
 * Reusable spinner component for loading states
 */
export const Spinner = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-black" role="status">
      <div
        className="
            w-[10vw] h-[10vw]
            rounded-full
            animate-spin
            border-[0.6vw] border-solid border-t-transparent"
      />
    </div>
  );
};

export default Spinner;
