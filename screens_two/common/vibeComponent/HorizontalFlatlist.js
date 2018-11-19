import React from "react";
import { View, FlatList } from "react-native";

import SectionHeader from "./SectionHeader";
import colors from '@theme/colorsThree';
import { w, h } from "../helpers";

const HorizontalFlatlist = ({
  label,
  onViewAll,
  data,
  renderItem,
  cardWidth,
  cardHeight,
  withButton = true,
  indent
}) => {
  return (
    <View>
      <SectionHeader
        style={{ marginLeft: w(indent ? indent : 18) }}
        label={label}
        onPress={onViewAll}
        withButton={withButton}
      />
      <FlatList
        horizontal
        pagingEnabled
        data={data}
        renderItem={renderItem}
        snapToAlignment="start"
        snapToInterval={w(cardWidth)}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(i, k) => `${k}`}
        style={{
          backgroundColor: colors.paleGrey,
          height: h(cardHeight)
        }}
        ItemSeparatorComponent={() => (
          <View style={{ width: w(4), height: h(cardHeight) }} />
        )}
        contentContainerStyle={{
          paddingHorizontal: w(indent ? indent : 15)
        }}
      />
    </View>
  );
};

export default HorizontalFlatlist;

const styles = {};
