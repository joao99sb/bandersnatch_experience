import { ModalButton } from "../components/ModalButton";

export const buttonFunction = (options: string[], nextChunck: any) => {
  const [option1, option2] = options;
  return (
    <>
      <ModalButton option={option1} nextChunck={nextChunck} />
      <ModalButton option={option2} nextChunck={nextChunck} />
    </>
  );
};
