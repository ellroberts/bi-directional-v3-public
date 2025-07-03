export default function TwoColumnLayout({ leftContent, rightContent }) {
  return (
    <div className="flex flex-col md:flex-row gap-6 md:gap-[24px] items-start">
      <div className="w-full md:w-2/3">{leftContent}</div>
      <div className="w-full md:w-1/3">{rightContent}</div>
    </div>
  );
}
