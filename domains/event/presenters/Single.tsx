import styled from "styled-components";
import { colors, sizes, screens, fonts } from "variables";
import { Columns, Stacked } from "unflexible-ui-core";
import { PlainText } from "components/container";
import { MiniButton } from "components/button";

import { useRouter } from "next/router";
import { Event, Tag } from "../";
import { nl2br } from "lib/util";

type Props = {
  event: Event;
};

export const Single = ({ event }: Props) => {
  const router = useRouter();

  return (
    <Component>
      <Stacked paddingPos="none">
        <div className="title">
          <h1>{event.title}</h1>

          <div className="meta">
            <p>
              <a href={`/event/category/${event.category.slug}`}>
                {event.category.name}
              </a>
            </p>
            <ul>
              {event.tags.map((tag: Tag) => {
                return (
                  <li key={tag.id}>
                    <a href={`/event/tag/${tag.slug}`}>{tag.name}</a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </Stacked>

      <Stacked paddingPos="top" paddingSize="thin">
        <div className="header">
          <div className="thumbnail">
            <img src={event.keyVisual.url} alt={event.title} loading="lazy" />
          </div>

          <div className="info">
            <p className="overview">{event.overview}</p>

            <dl>
              <div>
                <dt>日程</dt>
                <dd
                  dangerouslySetInnerHTML={{
                    __html: nl2br(event.schedule),
                  }}
                />
              </div>
              <div>
                <dt>場所</dt>
                <dd
                  dangerouslySetInnerHTML={{ __html: nl2br(event.location) }}
                />
              </div>
            </dl>
          </div>
        </div>
      </Stacked>

      <Stacked paddingPos="top" paddingSize="thin">
        <PlainText text={event.details} />
      </Stacked>

      {event.googleMap && (
        <Stacked paddingPos="top" paddingSize="thin">
          <div className="map">
            <h2>マップ</h2>
            <div dangerouslySetInnerHTML={{ __html: event.googleMap }} />
          </div>
        </Stacked>
      )}

      <Stacked paddingPos="top" paddingSize="thin">
        <Columns justify="center">
          <MiniButton
            type="button"
            name="一覧に戻る"
            onClick={() => router.back()}
            color={colors.theme}
          />
        </Columns>
      </Stacked>
    </Component>
  );
};

const Component = styled.article`
  position: relative;

  .title {
    h1 {
      font-size: 3.5rem;
      font-family: ${fonts.heading};
      line-height: 1.25;
    }
  }

  @media only screen and (max-width: ${screens.m}px) {
    .title {
      h1 {
        font-size: 2.5rem;
      }
    }
  }

  @media only screen and (max-width: ${screens.s}px) {
    .title {
      h1 {
        font-size: 2rem;
      }
    }
  }

  .header {
    display: flex;
    align-items: flex-start;
  }

  @media only screen and (max-width: ${screens.m}px) {
    .header {
      display: block;
    }
  }

  .thumbnail {
    position: relative;
    flex-shrink: 0;
    flex-grow: 0;
    width: 50%;
    border-radius: 20px;
    overflow: hidden;

    img {
      width: 100%;
      height: auto;
      vertical-align: middle;
    }
  }

  @media only screen and (max-width: ${screens.m}px) {
    .thumbnail {
      width: 100%;
    }
  }

  .info {
    margin-left: ${sizes.gapL};
  }

  @media only screen and (max-width: ${screens.m}px) {
    .info {
      margin-top: ${sizes.gapM};
      margin-left: 0;
    }
  }

  .meta {
    display: flex;
    align-items: center;
    margin-top: ${sizes.gapS};

    p {
      flex-shrink: 0;

      a {
        display: block;
        color: ${colors.white};
        padding: ${sizes.gapXS} ${sizes.gapS};
        background-color: ${colors.theme};
        line-height: 1.5;
        border-radius: 3px;
        text-decoration: none;
      }
    }

    ul {
      margin: 0 -0.25rem;
      margin-left: 1rem;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      list-style: none;
    }

    li {
      flex-shrink: 0;
      line-height: 1.5;

      a {
        display: block;
        padding: 0 0.5rem;
        color: ${colors.black};

        &::before {
          content: "#";
        }
      }
    }
  }

  @media only screen and (max-width: ${screens.xs}px) {
    .meta {
      ul {
        margin-left: .75rem;
      }
    }
  }

  dl {
    margin-top: ${sizes.gapM};

    > div {
      display: flex;

      &:not(:first-child) {
        margin-top: ${sizes.gapM};
      }
    }

    dt {
      flex-shrink: 0;
      flex-grow: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 8rem;
      padding: ${sizes.gapXS};
      background-color: ${colors.gray};
      border-radius: 3px;
      text-align: center;
    }

    dd {
      margin-left: ${sizes.gapS};
      padding: ${sizes.gapXS};
      line-height: 1.5;
    }
  }

  .map {
    h2 {
      padding: ${sizes.gapXS} 0;
      font-size: 1.5rem;
      text-align: center;
      border-top: 5px solid ${colors.gray};
      border-bottom: 5px solid ${colors.gray};
    }
  }

  .map {
    > div {
      position: relative;
      width: 100%;
      margin-top: ${sizes.gapL};

      iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }

      &::before {
        position: relative;
        z-index: 1;
        content: "";
        display: block;
        padding-top: 50%;
      }
    }
  }
`;
