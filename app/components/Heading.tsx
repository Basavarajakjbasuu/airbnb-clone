'use client';

interface HeadingProps {
  title: string;
  subTitle?: string;
  center?: boolean; 
}


const Heading: React.FC<HeadingProps> = ({
  title,
  subTitle,
  center
}) => {
  return (
    <div className={`${center ? "text-center" : 'text-start'}`}>
      <h4 className="text-2xl font-bold">
        {title}
      </h4>

      <p className="font-light text-neutral-500 mt-2">
        {subTitle}
      </p>
    </div>
  )
}

export default Heading