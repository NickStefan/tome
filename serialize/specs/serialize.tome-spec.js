import {serializeBlock} from '../serialize-block';

describe('Block Serializer', function() {

    it('should serialize a styled range', function () {

        var blockSingleStyle =
        {
            blockType: 'P',
            rawText: 'My name is bob.',
            styles: [
                { name: 'fontWeight', value: '700', start: 11, end: 13}
            ]
        };
        var blockSingleStyleHTML = '<p>My name is <span style="font-weight: 700;">bob</span>.</p>';

        expect(serializeBlock(blockSingleStyle)).to.equal(blockSingleStyleHTML);
    });

    it('should serialize multiple styled ranges', function () {

        var blockMultiStyle =
        {
            blockType: 'P',
            rawText: 'My name is bob. My name is Bob Smith',
            styles: [
                { name: 'fontWeight', value: '700', start: 11, end: 13},
                { name: 'fontWeight', value: '700', start: 27, end: 35}
            ]
        };
        var blockMultiStyleHTML = '<p>My name is <span style="font-weight: 700;">bob</span>. My name is <span style="font-weight: 700;">Bob Smith</span></p>';

        expect(serializeBlock(blockMultiStyle)).to.equal(blockMultiStyleHTML);
    });


    it('should serialize nested styled ranges', function () {

        var blockNestedStyle =
        {
            blockType: 'P',
            rawText: 'My name is bob. My name is Bob Smith',
            styles: [
                { name: 'fontWeight', value: '700', start: 11, end: 13 },
                { name: 'fontWeight', value: '700', start: 27, end: 35 },
                { name: 'color', value: 'green', start: 11, end: 29 }
            ]
        };
        var blockNestedStyleHTML = '<p>My name is <span style="color: green;"><span style="font-weight: 700;">bob</span>. My name is </span><span style="font-weight: 700;"><span style="color: green;">Bob</span> Smith</span></p>';

        expect(serializeBlock(blockNestedStyle)).to.equal(blockNestedStyleHTML);
    });



    it('should serialize multiple partially overlapping nested style ranges', function () {

        var blockMultiPartialOverlappedStyles =
        {
            blockType: 'P',
            rawText: 'My name is bob. My name is Bob Smith',
            styles: [
                { name: 'fontWeight', value: '700', start: 11, end: 13 },
                { name: 'fontWeight', value: '700', start: 27, end: 35 },
                { name: 'color', value: 'green', start: 11, end: 29 },
                { name: 'fontStyle', value: 'italic', start: 8, end: 14 }
            ]
        };

        var blockMultiPartialOverlappedStylesHTML = '<p>My name <span style="font-style: italic;">is </span><span style="color: green;"><span style="font-style: italic;"><span style="font-weight: 700;">bob</span>.</span> My name is </span><span style="font-weight: 700;"><span style="color: green;">Bob</span> Smith</span></p>';

        expect(serializeBlock(blockMultiPartialOverlappedStyles)).to.equal(blockMultiPartialOverlappedStylesHTML);
    });
});
