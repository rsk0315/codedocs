RUBY = ruby
SRCDIR = src/
MD_TO_HTML = $(SRCDIR)/marker.rb

%.html: %.md
	$(RUBY) $(MD_TO_HTML) $< $@
