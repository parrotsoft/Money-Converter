$(function() {
    const typeM = document.querySelector('#typeM');
    const mount = document.querySelector('#value');
    const result = document.querySelector('#result');
    document.getElementById("btnConvertir").onclick = (e) => {
        e.preventDefault();
        // alert($('#value').cleanVal().val());
        const type = validateType(typeM.value);
        if (mount.value) {
            if (isNaN(mount.value)) {
                alert('Please enter a value.');
            } else {
                getData(type, mount.value);
            }
        } else  {
            alert('Please enter a value.');
        }
    }

    function validateType(tp) {
        if (tp == 1) {
            // $('#value').mask("#.##0,00", {reverse: true, watchDataMask: true});
            // $('#result').mask("#.##0,00", {reverse: true, watchDataMask: true});
            return {
                prop1: 'USD',
                prop2: 'COP'
            }
        } else {
            return {
                prop1: 'COP',
                prop2: 'USD'
            }
        }
    }

    function getData(type, mount) {
        fetch(`http://api.wahrungsrechner.org/v1/quotes/${type.prop1}/${type.prop2}/json?qty=${mount}&key=4806|RB*~riho7yu*tRa0nvDpPvYKFu*cj2QB`).then(function(response) {
            return response.json();
        }).then(function(data) {
            this.result.value = (mount*data.result.amount);
        }).catch(function(error) {
            alert('Error ', JSON.stringify(error));
        })
    }

});