$(document).ready(function (){
    function getInfo() {
        let search = $('#idSuperHero').val()
        let expresion = /^[0-9]+$/

        if (expresion.test(search)) {
            getData(search)
        } else {
            alert('Ingrese solo números')
            $('#result').hide()
        }
    }

    function getData(id){
        $.ajax({
            type: 'GET',
            dataType: 'json',
            url: `https://www.superheroapi.com/api.php/4905856019427443/${id}`,
            success(data) {
                if (data.response === 'error') {
                    $('#result').hide()
                    alert('El ID no se encuentra')
                    return
                }
                showData(data)
                showChart(data)
            },
            error(error){
                console.log(error)
                $('#result').hide()
                alert('Error al traer los datos')
            }
        })
    }

    function showData(data){
        $('#nombre-superhero').html(data.name)
        $('#conexiones').html(data.connections["group-affiliation"])
        $('#publicadoPor').html(data.biography.publisher)
        $('#ocupacion').html(data.work.occupation)
        $('#primeraAparicion').html(data.biography['first-appearance'])
        $('#altura').html(data.appearance.height.join(' - '))
        $('#peso').html(data.appearance.weight.join(' - '))
        $('#alianzas').html(data.biography.aliases.join(' '))
        $('.avatar').attr('src', data.image.url)
        $('.result').show()
    }

    function showChart(data){
        var chart = new CanvasJS.Chart('chart', {
            title: {
                text: `Estadísticas de poder para ${data.name}`
            },
            legend: {
                maxWidth: 350,
                itemWidth: 120
            },
            data: [
                {
                    type: 'doughnut',
                    showInLegend: true,
                    legendText: '{indexLabel}',
                    dataPoints: [
                        { y: data.powerstats.intelligence, indexLabel: "Inteligencia" },
                        { y: data.powerstats.strength, indexLabel: "Fuerza" },
                        { y: data.powerstats.speed, indexLabel: "Velocidad" },
                        { y: data.powerstats.durability, indexLabel: "Durabilidad" },
                        { y: data.powerstats.power, indexLabel: "Poder" },
                        { y: data.powerstats.combat, indexLabel: "Combate" }
                    ]
                }
            ]
        })
        chart.render()
    }

    $("form").on("submit", function (event) {
        event.preventDefault();
        getInfo();
      })
})