export default function ButtonDark(props) {
  return (
    <button
      onClick={props.action}
      className={`${props.margin} disabled:opacity-50 bg-black hover:bg-gray-700 text-white font-bold pt-1.5 pb-2.5 px-5 rounded-full transition-all`}
      disabled={props.disabled}
    >
      {props.text}
    </button>
  );
}
