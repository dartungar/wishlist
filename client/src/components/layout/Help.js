import React from "react";
import styled from "styled-components";
import CollapsibleSectionContainer from "./CollapsibleSectionContainer";

const HelpContainer = styled.div``;

const HelpBlock = styled.div`
  margin-top: 3rem;

  img {
    max-width: 100%;
  }

  ul {
    list-style: none;
    padding: 1rem;
  }

  li {
    margin-bottom: 0.25rem;
  }

  .emoji {
    margin-right: 0.5rem;
  }
`;

const Help = () => {
  return (
    <HelpContainer>
      <h1>Справка</h1>
      <HelpBlock>
        <h3>Зачем нужен WishLis</h3>
        <p>
          Wishlist - это список желаний. Он поможет людям подарить вам то, что
          вы хотите. Пользоваться просто:
        </p>
        <ul>
          <li>
            <span className="emoji">👋</span> Зарегистрируйтесь.
          </li>
          <li>
            <span className="emoji">📝</span>
            Составьте список того, что хотите получить в подарок. Отметьте
            "большие" подарки - их можно дарить вскладчину.
          </li>
          <li>
            <span className="emoji">🚀</span> Отправьте ссылку на ваш список
            желаний знакомым, друзьям, коллегам.
          </li>
          <li>
            <span className="emoji">🎁</span>
            Они увидят, что вы хотите, и смогут записаться в дарители. На
            "большие" подарки можно записаться группой.
          </li>
        </ul>
        <p>Дарителей видят все, кроме автора списка желаний. </p>
        <p>
          Найти списки желаний друзей и записаться в дарители можно без
          регистрации.
        </p>
        <p></p>
      </HelpBlock>

      <HelpBlock>
        <CollapsibleSectionContainer title="Как создать список">
          <p>
            Зарегистрируйтесь - у вас появится свой список желаний. Наполнить
            список просто:
            <img
              src="./AddWishlistItem.gif"
              alt="Добавление новой записи в список желаний"
              srcset=""
            />
          </p>
        </CollapsibleSectionContainer>
      </HelpBlock>
      <HelpBlock>
        <CollapsibleSectionContainer title="Как найти списки друзей">
          <p>
            На странице "Поиск" можно искать друзей по имени, фамилии или id.
            Пользователя можно добавить в "Избранные" для быстрого доступа.
            <img
              src="./SearchUsers.gif"
              alt="Поиск пользователей и добавление в избранное"
              srcset=""
            />
          </p>
        </CollapsibleSectionContainer>
      </HelpBlock>
      <HelpBlock>
        <CollapsibleSectionContainer title="Как записаться в дарители">
          <p>
            Записаться в дарители можно, кликнув на "
            <i className="fas fa-gift"></i>" (для обычных подарков) / "
            <i className="fas fa-users"></i>" (для даримых вскладчину):
            <img
              src="./BecomeGifter.gif"
              alt="Записаться дарителем"
              srcset=""
            />
          </p>
        </CollapsibleSectionContainer>
      </HelpBlock>
      <HelpBlock>
        <CollapsibleSectionContainer title="Как выписаться из дарителей">
          <p>
            Попросите владельца списка очистить список дарителей этого подарка.
            Владелец списка не увидит ваше имя.
          </p>
        </CollapsibleSectionContainer>
      </HelpBlock>
    </HelpContainer>
  );
};

export default Help;
