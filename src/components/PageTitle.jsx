import "./PageTitle.css";

const PageTitle = ({titleText, id}) => {
  return (
    <>
        <div className={`page-title ${id}`}>{titleText}</div>
    </>
  );
};

export default PageTitle;
