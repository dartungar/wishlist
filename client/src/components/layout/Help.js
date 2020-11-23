import React from "react";
import styled from "styled-components";

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
        <p>Wishlist - это список желаний. Пользоваться просто:</p>
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
            <span className="emoji">🚀</span> Отправьте ссылку знакомым,
            друзьям, коллегам.
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
        <h3>Как создать список</h3>
        <p>
          Зарегистрируйтесь - у вас появится свой список желаний. Наполнить
          список просто:
          <img
            src="./AddWishlistItem.gif"
            alt="Добавление новой записи в список желаний"
            srcset=""
          />
        </p>
      </HelpBlock>
      <HelpBlock>
        <h3>Как найти списки друзей</h3>
        <p>
          На странице "Поиск" можно искать друзей по имени, фамилии или id.
          Пользователя можно добавить в "Избранные" для быстрого доступа.
          <img
            src="./SearchUsers.gif"
            alt="Поиск пользователей и добавление в избранное"
            srcset=""
          />
        </p>
      </HelpBlock>
      <HelpBlock>
        <h3>Как записаться в дарители</h3>
        <p>
          Записаться в дарители можно, кликнув на "
          <i className="fas fa-gift"></i>" (для обычных подарков) / "
          <i className="fas fa-users"></i>" (для даримых вскладчину):
          <img src="./becomeGifter.gif" alt="Записаться дарителем" srcset="" />
        </p>
      </HelpBlock>
      <HelpBlock>
        <h3>Как выписаться из дарителей</h3>
        <p>
          Попросите владельца списка очистить список дарителей этого подарка.
          Владелец списка не увидит ваше имя.
        </p>
      </HelpBlock>
    </HelpContainer>
  );
};

export default Help;
