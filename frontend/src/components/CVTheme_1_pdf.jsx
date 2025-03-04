import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Document, Page, View, Text, Image, StyleSheet, Font } from '@react-pdf/renderer';
import info from '../utils/infos';
import avatar from '../assets/imgs/blank-profile-picture-973460_960_720.png';
import LexendRegular from '../assets/fonts/static/Lexend-Regular.ttf';
import LexendBold from '../assets/fonts/static/Lexend-Bold.ttf';
import LexendLight from '../assets/fonts/static/Lexend-Light.ttf';
import LexendMedium from '../assets/fonts/static/Lexend-Medium.ttf';
import LexendThin from '../assets/fonts/static/Lexend-Thin.ttf';
import LexendSemiBold from '../assets/fonts/static/Lexend-SemiBold.ttf';
import { stripHtml } from '../utils/functions';

Font.register({
  family: 'Lexend',
  fonts: [
    { src: LexendRegular },
    { src: LexendBold, fontWeight: 'bold' },
    { src: LexendLight, fontWeight: 'light' },
    { src: LexendMedium, fontWeight: 'medium' },
    { src: LexendThin, fontWeight: 'thin' },
    { src: LexendSemiBold, fontWeight: 'semibold' },
  ],
});

// Định nghĩa styles cho PDF
const styles = StyleSheet.create({
  page: {
    backgroundColor: '#ffffff',
    flexDirection: 'column',
    fontFamily: 'Lexend',
  },
  header: {
    flexDirection: 'row',
    paddingVertical: 16,
    paddingHorizontal: 40,
    alignItems: 'flex-end',
    height: 192,
    backgroundColor: '#ffffff',
    position: 'relative',
  },
  skewBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#e9e9e9',
    transform: [{ skewY: '-30deg' }],
    transformOrigin: 'bottom left',
  },
  headerContent: {
    flex: 1,
    flexDirection: 'column',
    paddingBottom: 24,
  },
  name: {
    fontSize: 16,
    fontWeight: 'medium',
    color: '#000000',
  },
  jobTitle: {
    fontSize: 14,
    color: '#000000',
    marginTop: 4,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 2,
    borderColor: '#ffffff',
    objectFit: 'cover',
  },
  body: {
    flexDirection: 'row',
    padding: 16,
    gap: 16,
  },
  leftColumn: {
    width: '45%',
    flexDirection: 'column',
    gap: 16,
  },
  rightColumn: {
    width: '55%',
    flexDirection: 'column',
    gap: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'medium',
    textTransform: 'uppercase',
  },
  sectionContent: {
    fontSize: 12,
    color: '#000000',
  },
  lineVertical: {
    width: 1,
    backgroundColor: '#e5e7eb',
  },
  lineHorizontal: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginVertical: 8,
  },
});

// Hàm renderBasicCV cho PDF
const renderBasicCV_PDF = (items, currentRole) => {
  return items?.map((item, index) => (
    <View key={index} style={{ flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 4 }}>
      {item?.icon && (
        <Text>
        {item?.name === 'gender'
          ? currentRole?.basic_info[item?.name]?.name
          : currentRole?.basic_info[item?.name]}
      </Text>
      )}
    </View>
  ));
};

// Hàm renderOtherCV cho PDF
const renderOtherCV_PDF = (items, currentRole, options = {}) => {
  const { color } = options;

  return items?.map((item, index) => (
    <View key={index} style={{ flexDirection: 'column' }}>
      <Text style={[styles.sectionTitle, { color: color || '#000000' }]}>
        {item?.title}
      </Text>
      <View style={styles.sectionContent}>
        {item?.name === 'skills' ? (
          currentRole?.other_info?.[item?.name]?.map((skill) => (
            <Text key={skill?.value}>{skill?.name}</Text>
          ))
        ) : (
          <Text>{stripHtml(currentRole?.other_info?.[item?.name])}</Text>
        )}
      </View>
      {index !== items.length - 1 && <View style={styles.lineHorizontal} />}
    </View>
  ));
};

// Component PDF
const CVTheme_1_PDF = ({ color, currentRole, basicInfo, otherInfo }) => {

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.skewBackground} />
          <View style={styles.headerContent}>
            <Text style={styles.name}>{currentRole?.basic_info?.name}</Text>
            <Text style={styles.jobTitle}>Sinh viên</Text>
          </View>
          <Image
            src={currentRole?.basic_info?.image?.url || avatar}
            style={styles.avatar}
          />
        </View>
        {/* Body */}
        <View style={styles.body}>
          <View style={styles.leftColumn}>
            <View>
              <Text style={[styles.sectionTitle, { color: color || '#000000' }]}>
                Thông tin cá nhân
              </Text>
              {renderBasicCV_PDF(basicInfo, currentRole)}
            </View>
            {renderOtherCV_PDF(otherInfo?.slice(0, 3), currentRole, { color })}
          </View>
          <View style={styles.lineVertical} />
          <View style={styles.rightColumn}>
            {renderOtherCV_PDF(otherInfo?.slice(3, 6), currentRole, { color })}
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default CVTheme_1_PDF;