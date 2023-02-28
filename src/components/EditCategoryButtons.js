import { useEffect } from "react";
import { CustomButton } from "./index";
import { useAppContext } from "../context/app_context";
import styled from "styled-components";
import useMediaQuery from "../utils/mediaQuery";
import { gsap } from "gsap/dist/gsap";

const EditCategoryButtons = ({
  id,
  inputName,
  richText,
  setCurrentCategory,
}) => {
  const {
    isModal,
    openModal,
    categoryName,
    changeCategory,
    isFormVisible,
    hideForm,
    stopEditing,
    favouriteBookCategories,
    getNotes,
  } = useAppContext();

  const message =
    "You have an unsaved field, if you continue it's values will be lost. Do you want to proceed?";
  const mediaQuery = useMediaQuery("(min-width: 1300px)");

  const { notification } = isModal;

  const changeTitle = async (e) => {
    try {
      const { name } = inputName;
      const { desc } = richText;
      if (
        isFormVisible &&
        notification &&
        (name.length !== 0 || desc.length !== 0)
      ) {
        setCurrentCategory(e.target.dataset.title);
        return await openModal({ message, actionType: "changeCategory" });
      }

      await hideForm();
      await stopEditing();
      await changeCategory(e.target.dataset.title);
      await getNotes(id, e.target.dataset.title);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (mediaQuery) {
      gsap.utils.toArray(".category-btn-container").forEach((container) => {
        const categoryBtn = container.children[0];
        const category = categoryBtn.dataset.title;
        const addBtn = container.children[1];
        gsap.set(addBtn, { autoAlpha: 0, x: "-50px" });

        if (category === categoryName) {
          gsap.to(addBtn, {
            duration: 0.25,
            ease: "Expo.easeOut",
            x: "0px",
            autoAlpha: 1,
          });
        }
      });
    }
  }, [categoryName, mediaQuery]);

  return (
    <Wrapper>
      {favouriteBookCategories &&
        favouriteBookCategories.map((category, i) => {
          return (
            <CustomButton
              key={i}
              name={category}
              className="btn category-btn"
              handleChange={changeTitle}
            />
          );
        })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  text-align: center;

  .active-btn {
    background: yellowgreen;
    z-index: 2;
  }

  .category-btn-container {
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
    transition: var(--transition);
    .add-icon {
      opacity: 0;
      background: dodgerblue;
      color: whitesmoke;
      border-radius: 15px;
      font-size: 2rem;
      transition: var(--transition);
      display: none;
      z-index: 1;
      &:hover {
        background: salmon;
      }
    }
  }

  @media screen and (min-width: 1300px) {
    display: grid;

    .category-btn-container {
      gap: 1rem;
      .add-icon {
        display: block;
        &:hover {
          background: salmon;
        }
      }
    }
  }
`;
export default EditCategoryButtons;
