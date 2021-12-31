document.querySelector(
  "#handlebar-template"
).innerHTML = `<script type="text/x-handlebars-template" id="template">
<ul>
  {{#each list}}
    <li>
      <div class="card">
        <img src="{{ this.avatar }}" style="background:#e0e0e0;";/>
        <div class="w-100">
          <div class="contact-name flex w-100 items-center justify-between">
            <p class="card-name">{{ this.name }}</p>
          </div>
          <button
            id="{{this.id}}"
            onclick="toggleShowMore(this.id)"
            class="show-more {{#if this.showMore}} opened {{/if}}">
            more...
          </button>
          <div class="details {{#if this.showMore}} show {{/if}}">
            <p>ID: {{ this.id }}</p>
            <p>Registered at: {{ formatDate this.createdAt }}</p>
          </div>
        </div>
      </div>
    </li>
  {{/each}}
</ul>
</script>`;

var data = {};
var toggleShowMore = (id) => {
  const updatedList = data?.list.map((listItem) => {
    if (listItem.id == id) {
      listItem.showMore = !listItem.showMore;
    }
    return listItem;
  });

  data.list = updatedList;
  fillTemplate(data);
};

var fillTemplate = (data) => {
  const template = Handlebars.compile(
    document.querySelector("#template").innerHTML
  );
  const filled = template(data);
  document.querySelector("#demo").innerHTML = filled;
};

var fetchData = () => {
  const assessmentUrl =
    "https://615485ee2473940017efaed3.mockapi.io/assessment";

  fetch(assessmentUrl)
    .then((response) => response.json())
    .then((list) => {
      data.list = list;
      fillTemplate(data);
    });
};

var registerHelpers = () => {
  Handlebars.registerHelper("formatDate", function (dateTime) {
    return new Date(dateTime).toLocaleDateString("en-US");
  });
};
