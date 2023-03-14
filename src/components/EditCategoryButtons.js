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
    deleteCategory,
    isFormVisible,
    hideForm,
    stopEditing,
    favouriteBookCategories,
    getNotes,
    getAllCategories,
  } = useAppContext();

  let message;
  const mediaQuery = useMediaQuery("(min-width: 1300px)");

  const { notification, allActions } = isModal;

  const changeTitle = async (e) => {
    try {
      const { name } = inputName;
      const { desc } = richText;
      if (
        isFormVisible &&
        notification &&
        (name.length !== 0 || desc.length !== 0)
      ) {
        message =
          "You have an unsaved field, if you continue it's values will be lost. Do you want to proceed?";
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

  const deleteField = async () => {
    try {
      if (notification) {
        message = "Are you sure you want to delete this category?";
        return await openModal({ message, actionType: "deleteCategory" });
      }

      await deleteCategory(id, categoryName);
      await getAllCategories(id);
      await changeCategory("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (allActions.deleteCategory) {
      deleteCategory(id, categoryName);
      getAllCategories(id);
      changeCategory("");
    }
    // eslint-disable-next-line
  }, [allActions.deleteCategory]);

  useEffect(() => {
    if (mediaQuery) {
      gsap.utils.toArray(".category-btn-container").forEach((container) => {
        const categoryBtn = container.children[0];
        const category = categoryBtn.dataset.title;
        const addBtn = container.children[1];
        const removeBtn = container.children[2];
        gsap.set([addBtn, removeBtn], { autoAlpha: 0, x: "-50px" });

        const tl = gsap.timeline();

        if (category === categoryName) {
          tl.to(addBtn, {
            duration: 0.25,
            ease: "Expo.easeOut",
            x: "0px",
            autoAlpha: 1,
          }).to(removeBtn, {
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
      <div>
        <h4>categories</h4>
      </div>
      <div className="container">
        {favouriteBookCategories &&
          favouriteBookCategories.map((category, i) => {
            return (
              <CustomButton
                key={i}
                name={category}
                className="btn category-btn"
                changeTitle={changeTitle}
                deleteField={deleteField}
              />
            );
          })}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .active-btn {
    background: yellowgreen;
    z-index: 2;
  }

  .container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  .category-btn-container {
    display: grid;
    grid-template-columns: 1fr auto auto;
    align-items: center;
    transition: var(--transition);
    .add-icon,
    .delete-icon {
      opacity: 0;
      background: dodgerblue;
      color: whitesmoke;
      border-radius: 15px;
      font-size: 2rem;
      transition: var(--transition);
      display: none;
      z-index: 1;
      &:hover {
        background: yellowgreen;
      }
    }
    .delete-icon {
      background: tomato;
      &:hover {
        background: red;
      }
    }
  }

  h4 {
    text-align: center;
    font-weight: 500;
    margin-bottom: 1rem;
    padding: 0 0.75rem;
  }

  @media screen and (min-width: 1300px) {
    .container {
      display: grid;
      justify-content: flex-start;
    }

    .category-btn-container {
      gap: 1rem;
      .add-icon,
      .delete-icon {
        display: block;
      }
    }

    h4 {
      text-align: left;
      font-weight: 500;
      margin-bottom: 1rem;
      padding: 0 0.75rem;
    }
  }
`;
export default EditCategoryButtons;
