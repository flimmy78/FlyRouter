# $Id: Makefile 001 2006-03-29 00:00:01Z zig_fisher $

include $(TOPDIR)/rules.mk

PKG_NAME:=cln
PKG_VERSION:=0.1
PKG_RELEASE:=1
PKG_MD5SUM:=

PKG_SOURCE_URL:=http://www.hamradio.crimea.ua/downloads/software/linux/archive/
PKG_SOURCE:=$(PKG_NAME)-$(PKG_VERSION).tgz
PKG_CAT:=zcat

PKG_BUILD_DIR:=$(BUILD_DIR)/$(PKG_NAME)-$(PKG_VERSION)
PKG_INSTALL_DIR:=$(PKG_BUILD_DIR)/ipkg-install

include $(TOPDIR)/package/rules.mk

$(eval $(call PKG_template,CLN,cln,$(PKG_VERSION)-$(PKG_RELEASE),$(ARCH)))

$(PKG_BUILD_DIR)/.configured:
	touch $@

$(PKG_BUILD_DIR)/.built:
	rm -rf $(PKG_INSTALL_DIR)
	mkdir -p $(PKG_INSTALL_DIR)
	$(MAKE) -C $(PKG_BUILD_DIR) \
	CC="$(TARGET_CC)" \
	CFLAGS="$(TARGET_CFLAGS) -I$(STAGING_DIR)/include -I$(STAGING_DIR)/usr/include" \
	LDFLAGS="-L$(STAGING_DIR)/lib -L$(STAGING_DIR)/usr/lib" 
	touch $@

$(IPKG_CLN):
	install -m0755 -d $(IDIR_CLN)/etc
	install -m0755 -d $(IDIR_CLN)/usr/sbin
	$(CP) $(PKG_BUILD_DIR)/cln $(IDIR_CLN)/usr/sbin/
	$(STRIP) $(IDIR_CLN)/usr/sbin/*
	$(IPKG_BUILD) $(IDIR_CLN) $(PACKAGE_DIR)
	install -m0644 $(PKG_BUILD_DIR)/.conf $(IDIR_CLN)/etc/cln.conf
