export default function ButtonLight(props) {
  return (
    <button className="bg-gray-200 border text-black font-bold pt-1.5 pb-2.5 px-5 rounded-full hover:bg-gray-100 transition-all">
      {props.text}
    </button>
  );
}
