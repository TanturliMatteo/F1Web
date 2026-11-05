import { useI18n } from "../i18n/i18n";
import RichText from "../i18n/RichText";

const Paragraphs = ({ items }: { items?: string[] }) =>
  items?.map((text) => (
    <p key={text}>
      <RichText text={text} />
    </p>
  ));

const PrivacyPage = () => {
  const { privacy } = useI18n();

  return (
    <div id="privacy-page" className="page-container page-state">
      <article id="privacy-card" className="ui-card legal-text">
        <header id="privacy-header">
          <h1>{privacy.title}</h1>
          <p className="text-muted-soft">
            <RichText text={privacy.updated} />
          </p>
          <Paragraphs items={privacy.intro} />
        </header>

        {privacy.sections.map((section) => (
          <section
            key={section.id}
            id={`privacy-${section.id}`}
            aria-labelledby={`privacy-${section.id}-title`}
          >
            <h2 id={`privacy-${section.id}-title`}>{section.title}</h2>
            <Paragraphs items={section.body} />
            {section.list && (
              <ul>
                {section.list.map((item) => (
                  <li key={item}>
                    <RichText text={item} />
                  </li>
                ))}
              </ul>
            )}
            <Paragraphs items={section.after} />
          </section>
        ))}
      </article>
    </div>
  );
};

export default PrivacyPage;
