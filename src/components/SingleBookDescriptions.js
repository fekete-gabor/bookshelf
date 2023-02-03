import { CustomDescription } from "./index";

const SingleBookDescriptions = ({ bookInfo }) => {
  const {
    title,
    subtitle,
    authors,
    averageRating,
    ratingsCount,
    categories,
    description,
    language,
    pageCount,
    publishedDate,
    publisher,
  } = bookInfo;

  return (
    <article>
      <CustomDescription
        fieldName="title"
        className="title"
        showFieldName
        value={title}
      />
      <CustomDescription
        fieldName="subtitle"
        className="subtitle"
        showFieldName
        value={subtitle}
      />
      <CustomDescription
        fieldName="authors"
        className="authors"
        showFieldName
        value={authors}
      />
      <CustomDescription
        fieldName="average rating"
        className="averageRating"
        showFieldName
        value={averageRating && `${averageRating} / 5`}
      />
      <CustomDescription
        fieldName="ratings count"
        className="ratingsCount"
        showFieldName
        value={ratingsCount}
      />
      <CustomDescription
        fieldName="categories"
        className="categories"
        showFieldName
        value={categories}
      />
      <CustomDescription
        fieldName="description"
        className="description"
        value={description}
      />
      <CustomDescription
        fieldName="language"
        className="language"
        showFieldName
        value={language}
      />
      <CustomDescription
        fieldName="page count"
        className="pageCount"
        showFieldName
        value={pageCount}
      />
      <CustomDescription
        fieldName="publisher"
        className="publisher"
        showFieldName
        value={publisher}
      />
      <CustomDescription
        fieldName="date of publish"
        className="dateOfPublish"
        showFieldName
        value={publishedDate}
      />
    </article>
  );
};

export default SingleBookDescriptions;
