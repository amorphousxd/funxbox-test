# funxbox-test
Test task for funbox

Новая точка маршрута добавляется с помощью ввода ее названия в текстовом поле и нажатия Enter. После этого:

введенная точка маршрута отображается в конце списка уже добавленных точек;

в центре карты появляется маркер, обозначающий точку маршрута. Напротив каждой точки маршрута в списке находится кнопка удаления, при ее нажатии точка маршрута пропадает из списка, а с карты пропадает ее маркер.

При двойном клике на точку маршрута в списке ее название должно переходить в режим Edit-In-Place (редактирование завершается сохранением при потере фокуса или после нажатия Enter, отменяется при нажатии Esc).

Порядок точек маршрута в списке можно изменять перетаскиванием.

Маркеры, соответствующие точкам маршрута, можно перемещать по карте перетаскиванием.

Маркеры на карте соединены прямыми линиями в том порядке, в котором они находятся в списке. Полученная таким образом ломаная изображает маршрут, первая точка в списке — начало маршрута, последняя — конец маршрута.

При изменении порядка точек в списке или их удалении, а также при перемещении маркеров маршрут на карте автоматически перерисовывается.

При клике на маркер появляется балун, в балуне отображается название соответствующей ему точки. При показе балуна производится запрос к геокодеру карты. При получении результата в балуне появляется адрес точки. До того, как получен результат, в балуне отображается прелоадер.
