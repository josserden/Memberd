export const scrollerStyles = `
    ul, ol {
      list-style: none;
      padding-left: 0;
      margin-top: 0;
      margin-bottom: 0;
    }

    .gallery-column {
      display: flex;
      flex-direction: column;
      row-gap: 40px;
    }

    .gallery-item {
      position: relative;
      width: 260px;
      height: 400px;
      border-radius: 32px;
      background-color: var(--main-dark-color);
    }

    .gallery-item img {
      position: absolute;
      bottom: 0;
      left: 0;
      object-fit: cover;
    }

    .gallery-item-row-1 {
      height: 424px;
    }

    .gallery-item-row-1:nth-child(2) {
      opacity: 0.3;
    }

    .gallery-column:nth-child(1) {
      transform: translateY(-294px);
    }

    .gallery-column:nth-child(2) {
      transform: translateY(-18px);
    }
`;
