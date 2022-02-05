registerLayout(
  "centering",
  class {
    static inputProperties = [
      "--gap",
      "--no-of-columns",
      "--max-row-height",
      "--min-row-height",
    ];
    async intrinsicSizes(children, edges, styleMap) {
      const childrenSizes = await Promise.all(
        children.map((child) => {
          return child.intrinsicSizes();
        })
      );

      const maxContentSize =
        childrenSizes.reduce((sum, childSizes) => {
          return sum + childSizes.maxContentSize;
        }, 0) + edges.inline;

      const minContentSize =
        childrenSizes.reduce((max, childSizes) => {
          return sum + childSizes.minContentSize;
        }, 0) + edges.inline;

      return { maxContentSize, minContentSize };
    }

    async layout(children, edges, constraints, styleMap) {
      try {
        const gap = parseInt(styleMap.get("--gap"));
        const columns = parseInt(styleMap.get("--no-of-columns"));
        const minHeight = parseInt(styleMap.get("--min-row-height"));
        const maxHeight = parseInt(styleMap.get("--max-row-height"));
        console.log({ gap, columns, minHeight, maxHeight });
        const availableInlineSize = constraints.fixedInlineSize - edges.inline;
        const availableBlockSize = constraints.fixedBlockSize
          ? constraints.fixedBlockSize - edges.block
          : null;

        const width = (availableInlineSize - gap * (columns - 1)) / columns;
        let x = 0;
        let y = 0;
        let inlineOffset = 0;
        let blockOffset = edges.blockStart;
        let oddBlockOffset = edges.blockStart;
        let evenBlockOffset = edges.blockStart;
        const childPositions = [];
        const childFragments = await Promise.all(
          children.map((child, i) => {
            const inlineSize = width;
            let blockSize = (x + y) % 2 === 0 ? maxHeight : minHeight;
            if (inlineOffset + inlineSize > availableInlineSize) {
              x = 0;
              y++;
              inlineOffset = 0;
              if (y % 2 === 0) {
                oddBlockOffset += maxHeight + gap;
                evenBlockOffset += minHeight + gap;
              } else {
                oddBlockOffset += minHeight + gap;
                evenBlockOffset += maxHeight + gap;
              }

              blockSize = (x + y) % 2 === 0 ? maxHeight : minHeight;
              blockOffset += (x + y) % 2 === 0 ? maxHeight : minHeight;
            }

            childPositions.push({
              i: x,
              j: y,
              inlineOffset,
              blockOffset: x % 2 === 0 ? evenBlockOffset : oddBlockOffset,
              blockSize,
            });

            x++;

            inlineOffset += inlineSize + gap;
            const fragment = child.layoutNextFragment({
              fixedInlineSize: inlineSize,
              fixedBlockSize: blockSize,
              availableBlockSize,
            });
            return fragment;
          })
        );

        inlineOffset = 0;
        let maxChildBlockSize = 0;
        blockOffset = edges.blockStart;

        childFragments.forEach((fragment, i) => {
          fragment.blockOffset = childPositions[i].blockOffset;
          fragment.inlineOffset = childPositions[i].inlineOffset;
        });

        return {
          autoBlockSize: maxChildBlockSize + edges.block,
          childFragments,
        };
      } catch (error) {
        console.log(error);
      }
    }
  }
);
