const productCell = function (item) {
  return `
    <tr>
        <td>
            <img src=${item.image_url}>
        </td>
        <td>
            <h1>${item.description}</h1>
        </td>
        <td>
            <p>${item.sku}</p>
        </td>
        <td>
            <h2>$${new Intl.NumberFormat().format(item.price)}</h2>
        </td>
    </tr>
    `;
};
