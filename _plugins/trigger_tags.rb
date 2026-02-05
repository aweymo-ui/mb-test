# _plugins/trigger_tags.rb

module TriggerTags
  class ImageTrigger < Liquid::Block
    def initialize(tag_name, markup, tokens)
      super
      @attributes = {}
      markup.scan(Liquid::TagAttributes) do |key, value|
        @attributes[key] = value
      end
    end

    def render(context)
      objectid = @attributes['objectid'] || ''
      zoom = @attributes['zoom'] || '1'
      coordinates = @attributes['coordinates'] || '0,0'
      
      # Get item data from CSV
      items = context.registers[:site].data['make_believe']
      item = items.find { |i| i['objectid'] == objectid }
      
      if item
        image_src = item['image_small'] || ''
        image_alt = item['image_alt_text'] || ''
        image_citation = item['image_citation'] || ''
        item_url = "/items/#{objectid}"
        
        # Create hidden trigger element
        trigger = "<div class='image-trigger' "
        trigger += "data-image-id='#{objectid}' "
        trigger += "data-image-src='#{image_src}' "
        trigger += "data-image-alt='#{image_alt}' "
        trigger += "data-image-link='#{item_url}' "
        trigger += "data-zoom='#{zoom}' "
        trigger += "data-coordinates='#{coordinates}' "
        trigger += "data-image-citation='#{image_citation}' "
        trigger += "></div>"
        
        return trigger + super
      else
        return "<!-- Item #{objectid} not found -->" + super
      end
    end
  end

  class CitationTrigger < Liquid::Block
    def initialize(tag_name, markup, tokens)
      super
      @attributes = {}
      markup.scan(Liquid::TagAttributes) do |key, value|
        @attributes[key] = value
      end
    end

    def render(context)
      citation_id = @attributes['id'] || ''
      text = @attributes['text'] || ''
      
      # Create hidden trigger element
      trigger = "<div class='citation-trigger' "
      trigger += "data-citation-id='#{citation_id}' "
      trigger += "data-citation-text='#{text}' "
      trigger += "></div>"
      
      return trigger + super
    end
  end

  class EndImageTrigger < Liquid::Block
    def render(context)
      return "</div>"
    end
  end

  class EndCitationTrigger < Liquid::Block
    def render(context)
      return "</div>"
    end
  end
end

Liquid::Template.register_tag('start', TriggerTags::ImageTrigger)
Liquid::Template.register_tag('end', TriggerTags::EndImageTrigger)
Liquid::Template.register_tag('start', TriggerTags::CitationTrigger)
Liquid::Template.register_tag('end', TriggerTags::EndCitationTrigger)