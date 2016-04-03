using System;
using System.Collections.Generic;
using System.Linq;
using Orchard.ContentManagement;
using Orchard.DisplayManagement;
using Orchard.Localization;
using Orchard.Projections.Descriptors.Layout;
using Orchard.Projections.Models;
using Orchard.Projections.Services;

namespace GildeTheme.Providers.Layouts
{
    public class TileNavLayout : ILayoutProvider
    {
        private readonly IContentManager _contentManager;
        protected dynamic Shape { get; set; }

        public TileNavLayout(IShapeFactory shapeFactory, IContentManager contentManager)
        {
            _contentManager = contentManager;
            Shape = shapeFactory;
            T = NullLocalizer.Instance;
        }

        public Localizer T { get; set; }

        public void Describe(DescribeLayoutContext describe)
        {
            describe.For("Html", T("Html"), T("Html Layouts"))
                .Element("TileNav", T("Tile Navigation"), T("Organizes content items in a tile navigation widget."),
                    DisplayLayout,
                    RenderLayout,
                    "TileNavLayout"
                );
        }

        public LocalizedString DisplayLayout(LayoutContext context)
        {
            string columns = context.State.Columns;
            bool horizontal = Convert.ToString(context.State.Alignment) != "vertical";

            return horizontal
                       ? T("{0} columns grid", columns)
                       : T("{0} lines grid", columns);
        }

        public dynamic RenderLayout(LayoutContext context, IEnumerable<LayoutComponentResult> layoutComponentResults)
        {

            string outerDivClass = context.State.OuterDivClass;
            string outerDivId = context.State.OuterDivId;
            string innerDivClass = context.State.InnerDivClass;
            string firstItemClass = context.State.FirstItemClass;
            string itemClass = context.State.ItemClass;

            IEnumerable<dynamic> shapes =
               context.LayoutRecord.Display == (int)LayoutRecord.Displays.Content
                   ? layoutComponentResults.Select(x => _contentManager.BuildDisplay(x.ContentItem, context.LayoutRecord.DisplayType))
                   : layoutComponentResults.Select(x => x.Properties);

            return Shape.TileNav(Id: outerDivId, Items: shapes, OuterClasses: new[] { outerDivClass }, InnerClasses: new[] { innerDivClass }, FirstItemClasses: new[] { firstItemClass }, ItemClasses: new[] { itemClass });
        }
    }
}