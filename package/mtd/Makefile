# $Id: Makefile 3198 2006-02-09 03:21:01Z nbd $

include $(TOPDIR)/rules.mk

PKG_NAME := mtd
PKG_RELEASE := 4

PKG_BUILD_DIR := $(BUILD_DIR)/$(PKG_NAME)

include $(TOPDIR)/package/rules.mk

$(eval $(call PKG_template,MTD,$(PKG_NAME),$(PKG_RELEASE),$(ARCH)))
$(eval $(call PKG_template,MTD_STATIC,mtd-static,$(PKG_RELEASE),$(ARCH)))

$(PKG_BUILD_DIR)/.prepared:
	mkdir -p $(PKG_BUILD_DIR)
	touch $@

$(PKG_BUILD_DIR)/.configured:
	touch $@

$(PKG_BUILD_DIR)/.built:
	$(TARGET_CC) $(TARGET_CFLAGS) -o $(PKG_BUILD_DIR)/mtd mtd.c
	$(TARGET_CC) -static $(TARGET_CFLAGS) -o $(PKG_BUILD_DIR)/mtd-static mtd.c
	touch $@

$(IPKG_MTD): 
	install -d -m0755 $(IDIR_MTD)/sbin
	install -m0755 $(PKG_BUILD_DIR)/mtd $(IDIR_MTD)/sbin
	$(RSTRIP) $(IDIR_MTD)/sbin/*
	$(IPKG_BUILD) $(IDIR_MTD) $(PACKAGE_DIR)

$(IPKG_MTD_STATIC): 
	install -d -m0755 $(IDIR_MTD_STATIC)/sbin
	install -m0755 $(PKG_BUILD_DIR)/mtd-static $(IDIR_MTD_STATIC)/sbin
	$(RSTRIP) $(IDIR_MTD_STATIC)/sbin/*
	$(IPKG_BUILD) $(IDIR_MTD_STATIC) $(PACKAGE_DIR)
