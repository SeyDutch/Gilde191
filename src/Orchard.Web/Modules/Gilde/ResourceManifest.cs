using Orchard.UI.Resources;

namespace Gilde
{
    public class ResourceManifest : IResourceManifestProvider
    {
        public void BuildManifests(ResourceManifestBuilder builder)
        {
            var manifest = builder.Add();
            manifest.DefineStyle("Gallery").SetUrl("Gallery.min.css");
            manifest.DefineStyle("Contact").SetUrl("Contact.min.css");

            manifest.DefineScript("Slideshow").SetUrl("Slideshow.js").SetDependencies("jQuery", "Bootstrap");
            //manifest.DefineScript("Slideshow").SetUrl("slideshow_init.js").SetDependencies("PgwSlideshow");
        }
    }
}