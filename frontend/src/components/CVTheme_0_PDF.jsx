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
  },
  header: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
    height: 192,
  },
  avatar: {
    width: 150,
    height: 150,
    objectFit: 'cover',
  },
  headerContent: {
    flex: 1,
    flexDirection: 'column',
    paddingLeft: 16,
    fontFamily: 'Lexend',

  },
  name: {
    fontSize: 24,
    color: '#ffffff',
    fontWeight: 'bold',
    fontFamily: 'Lexend',

  },
  jobTitle: {
    fontSize: 14,
    color: '#a6a6a6',
    marginBottom: 8,
    fontFamily: 'Lexend',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  gridItem: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 4,
    fontSize: 12,
    color: '#a6a6a6',
  },
  body: {
    padding: 16,
    flexDirection: 'column',
    gap: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 8,
    fontFamily: 'Lexend',
  },
  sectionContent: {
    fontSize: 12,
    color: '#000000',
    fontFamily: 'Lexend',
  },
  line: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginVertical: 8,
  },
  icon: {
    width: 24,
    height: 24,
    marginBottom: 5,
  },
});

const icons = [
  {
    name: 'email',
    icon: "https://www.svgrepo.com/show/502648/email.svg",
  },
  {
    name: 'dob',
    icon: "https://www.svgrepo.com/show/342444/birthday-cake.svg",
  },
  {
    name: 'phone',
    icon: "https://www.svgrepo.com/show/526086/phone.svg",
  },
  {
    name: 'gender',
    icon: "https://www.svgrepo.com/show/344873/gender-ambiguous.svg",
  },
]

// Hàm renderBasicCV cho PDF
const renderBasicCV_PDF = (items, currentRole) => {
  return items?.map((item, index) => {
    const iconObj = icons.find(icon => icon.name === item.name); // Tìm icon phù hợp

    return (
      <View key={index} style={styles.gridItem}>
        {iconObj?.icon && (
          <Text>
          {console.log(item)}
          {item?.name === 'gender'
            ? currentRole?.basic_info[item?.name]?.name
            : currentRole?.basic_info[item?.name]}
        </Text>
        )}
      </View>
    );
  });
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
        {index !== items.length - 1 && <View style={styles.line} />}
      </View>
    ));
  };

// Component PDF
const CVTheme_0_PDF = ({ color, currentRole, basicInfo, otherInfo }) => {

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={[styles.header, { backgroundColor: color || '#000000' }]}>
          <Image
            src={currentRole?.basic_info?.image?.url || avatar}
            style={styles.avatar}
          />
          <View style={styles.headerContent}>
            <Text style={styles.name}>{currentRole?.basic_info?.name}</Text>
            <Text style={styles.jobTitle}>UX/UI Design</Text>
            <View style={styles.grid}>
              {renderBasicCV_PDF(basicInfo?.slice(1, 7), currentRole)}
            </View>
          </View>
        </View>
        {/* Body */}
        <View style={styles.body}>
          {renderOtherCV_PDF(otherInfo, currentRole, { color })}
        </View>
      </Page>
    </Document>
  );
};

export default CVTheme_0_PDF;