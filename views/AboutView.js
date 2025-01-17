'use strict';

var React = require('react-native');
var {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  LinkingIOS,
} = React;

var SafariView = require('react-native-safari-view');
var AppInfo = require('react-native-app-info');
var devicePx = require('../utils/devicePx');

var colors = require('../colors');

var styles = StyleSheet.create({
  aboutContainer: {
    marginTop: 34,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderTopWidth: devicePx,
    borderTopColor: colors.separatorColor,
    borderBottomWidth: devicePx,
    borderBottomColor: colors.separatorColor,
    backgroundColor: colors.sectionBackgroundColor,
    flexDirection: 'row',
  },
  appIcon: {
    width: 60,
    height: 60,
    marginRight: 10,
    borderColor: colors.separatorColor,
    borderWidth: devicePx,
    borderRadius: 14,
  },
  aboutTextContainer: {
    flex: 1,
  },
  aboutHeading: {
    fontWeight: '500',
    fontSize: 17,
  },
  aboutDescription: {
    fontSize: 15,
    color: colors.insignificantColor,
  },
  listContainer: {
    marginTop: 34,
    borderTopWidth: devicePx,
    borderTopColor: colors.separatorColor,
    borderBottomWidth: devicePx,
    borderBottomColor: colors.separatorColor,
    paddingLeft: 15,
    backgroundColor: colors.sectionBackgroundColor,
  },
  listItem: {
    paddingVertical: 13,
    paddingRight: 15,
    borderBottomWidth: devicePx,
    borderBottomColor: colors.separatorColor,
  },
  lastListItem: {
    borderBottomWidth: 0,
  },
  link: {
    backgroundColor: colors.sectionBackgroundColor,
    color: colors.linkColor,
    fontSize: 17,
  },
  disclaimer: {
    paddingVertical: 27,
    paddingHorizontal: 15,
  },
  disclaimerText: {
    color: colors.sectionInsignificantColor,
  }
});

var AboutView = React.createClass({
  render: function(){
    var linkPress = function(url){
      LinkingIOS.openURL(url);
      /* BUG: Once <Modal> is open, SafariView can't work anymore.
      if (/^mailto:/.test(url)){
        // Note: won't work in Simulator because there's no Mail there
        LinkingIOS.openURL(url);
      } else {
        SafariView.show({
          url: url
        });
      }
      */
    };
    var links = [
      { text: 'HackerWeb homepage', url: 'http://hackerwebapp.com/' },
      { text: 'Hacker News homepage', url: 'https://news.ycombinator.com/' },
      { text: 'Hacker News FAQ', url: 'https://news.ycombinator.com/newsfaq.html' },
      { text: 'HackerWeb for iOS on GitHub', url: 'https://github.com/cheeaun/hackerweb-ios' },
      { text: 'Follow @cheeaun', url: 'https://twitter.com/cheeaun' },
      { text: 'Send Feedback', url: 'mailto:cheeaun+hackerweb@gmail.com?subject=HackerWeb feedback' },
    ];
    var items = links.map(function(link, i){
      return (
        <View style={[styles.listItem, i == links.length-1 && styles.lastListItem]}>
          <TouchableOpacity onPress={linkPress.bind(null, link.url)}>
            <Text style={styles.link}>{link.text}</Text>
          </TouchableOpacity>
        </View>
      );
    });
    return (
      <ScrollView>
        <View style={styles.aboutContainer}>
          <View>
            <Image style={styles.appIcon} source={require('image!app-icon')}/>
          </View>
          <View style={styles.aboutTextContainer}>
            <Text style={styles.aboutHeading}>HackerWeb</Text>
            <Text style={styles.aboutDescription}>A simply readable Hacker News app.</Text>
            <Text style={styles.aboutDescription}>{AppInfo.getInfoShortVersion()}</Text>
          </View>
        </View>
        <View style={styles.listContainer}>
          {items}
        </View>
        <View style={styles.disclaimer}>
          <Text style={styles.disclaimerText}>Built by Lim Chee Aun.</Text>
          <Text style={styles.disclaimerText}>Not affiliated with Hacker News or YCombinator.</Text>
        </View>
      </ScrollView>
    );
  }
});

module.exports = AboutView;
