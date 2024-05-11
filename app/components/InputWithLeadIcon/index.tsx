interface Props {
  inputName: string;
  placeholder: string;
  type: string;
  svg: React.ReactSVGElement;
}

export const InputWithLeadIcon = ({ inputName, placeholder, type, svg }: Props) => {
  return (
    <div className="flex flex-row justify-center items-center h-[48px] w-full">
      <div className="bg-secondary p-3 rounded-l-lg h-full flex justify-center items-center w-[50px]">{svg}</div>
      {/* user@domain.tld */}
      <input
        className="w-full border-[1px] border-[#338B56]/10 focus:outline-none focus:border-[#338B56]/50 rounded-r-lg p-4"
        type={type}
        name={inputName}
        id={inputName}
        placeholder={placeholder}
      />
    </div>
  );
};
