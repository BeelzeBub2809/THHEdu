import React from 'react';

const FlexGlobalComponent = ({ center, spaceBetween, flxEnd, gap, children, style, ...props }) => {
  const getFlexStyle = () => {
    const baseStyle = {
      display: 'flex',
      ...style,
    };

    if (center) {
      baseStyle.justifyContent = 'center';
      baseStyle.alignItems = 'center';
    }

    if (spaceBetween) {
      baseStyle.justifyContent = 'space-between';
      baseStyle.alignItems = 'center';
    }

    if (flxEnd) {
      baseStyle.justifyContent = 'flex-end';
      baseStyle.alignItems = 'center';
    }

    if (gap) {
      baseStyle.gap = gap;
    }

    return baseStyle;
  };

  return (
    <div style={getFlexStyle()} {...props}>
      {children}
    </div>
  );
};

export default FlexGlobalComponent;
