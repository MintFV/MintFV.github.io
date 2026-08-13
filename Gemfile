source "https://rubygems.org"

# Ruby 3.4.0 Kompatibilität: Fehlende Standard-Bibliotheken
gem "csv"
gem "base64"
gem "bigdecimal"

gem "github-pages", group: :jekyll_plugins
# Liquid 4.0.3 calls Ruby's removed Hash#tainted? method under Ruby 3.3.
gem "liquid", ">= 4.0.4", "< 5.0"
gem "tzinfo-data"
gem "wdm", "~> 0.1.0" if Gem.win_platform?

# gem "jekyll", "~> 4.3"
gem "minimal-mistakes-jekyll"
gem "webrick", "~> 1.8"
gem "faraday-retry"
gem 'ostruct'

group :jekyll_plugins do
  gem "jekyll-paginate"
  gem "jekyll-sitemap"
  gem "jekyll-gist"
  gem "jekyll-feed"
  gem "jemoji"
  gem "jekyll-include-cache"
  gem "jekyll-algolia"
end
