using Orchard.UI.Resources;

namespace AirbrushTheme
{
    public class ResourceManifest : IResourceManifestProvider
    {
        public void BuildManifests(ResourceManifestBuilder builder)
        {
            var manifest = builder.Add();
            manifest.DefineStyle("Gildestyle").SetUrl("Gildestyle.min.css");
            manifest.DefineScript("Vendelscript").SetUrl("Vendelscript.js").SetDependencies("jQuery", "Bootstrap");
        }
    }
}
