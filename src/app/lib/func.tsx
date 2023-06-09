import { ModalButton } from "../components/ModalButton";

export const buttonFunction = (options: string[]) => {
  const [option1, option2] = options;
  return (
    <>
      <ModalButton option={option1} />
      <ModalButton option={option2} />
    </>
  );
};
