import LanguageSelect from "ui/languageSelect";

const LanguagePicker = () => {
  return (
    <div>
      <div>Select system language</div>
      <LanguageSelect menuPlacement="bottom" hideButtons={false} />
    </div>
  );
};

export default LanguagePicker;
