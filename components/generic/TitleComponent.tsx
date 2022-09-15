import type { NextComponentType, NextPageContext } from "next";

interface Props {
  content: string;
}

const TitleComponent: NextComponentType<NextPageContext, {}, Props> = ({ content }: Props) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-4">
          <h1 className="font-sans text-4xl md:text-5xl">{content}</h1>
          {/* TODO: Forms link */}
        </div>
      </div>
      <hr className="border-t-2 border-primary-accent mt-3" />
    </div>
  );
};

export default TitleComponent;
